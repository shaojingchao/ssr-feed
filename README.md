docker run --privileged=true --restart always -p 4008:3000 -it -d -v `pwd`:/root/ssr-feed --name ssr-feed2 ss-feed:1.0
