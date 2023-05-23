#app
docker build -t autenticator .

docker volume create --name nodemodules

# docker run \
#     --name mongodb \
#     -p 27017:27017 \
#     -d \
#     mongo:4

docker run \
    --name autenticator \
    -PORT=4000 \
    -p 4000:4000 \
    -v `pwd`/autenticator:/src
    -v nodemodules:/src/node_modules/
    autenticator npm run dev

    # --link mongodb \
    # -e MONGO_URL=mongodb \