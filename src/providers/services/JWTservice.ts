import * as jwt from 'jsonwebtoken';

interface IJWTData {
    uid: string;
}

const sign = (data: IJWTData) => {
    if(!process.env.JWT_SECRET) {
        return 'JWT_SECRET_NOT_FOUND';
    }
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

const verify = (tokn: string): IJWTData | { "error": 'JWT_SECRET_NOT_FOUND' } | { "error":'INVALID_TOKEN' } => {
    if(!process.env.JWT_SECRET) {
        return { "error": 'JWT_SECRET_NOT_FOUND' };
    }
    try {
        const decoded = jwt.verify(tokn, process.env.JWT_SECRET);
        if(typeof decoded === 'string') {
            return { "error":'INVALID_TOKEN' };
        }
        return decoded as IJWTData;
    } catch (err) {
        return { "error":'INVALID_TOKEN' };
    }
    
}

const JWTVerifier = (token: string): boolean => {
    try {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        if (!decodedToken || typeof decodedToken.exp === 'undefined') {
          return true;
        }
        
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTimestamp;
      } catch (error) {
        return true;
      }
}

export const JWTservice = {
    sign,
    verify,
    JWTVerifier
};