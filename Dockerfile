FROM frolvlad/alpine-ruby

RUN apk add git && gem install rdoc --no-document dpl

ENTRYPOINT ["dpl"]