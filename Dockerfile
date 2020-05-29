FROM frolvlad/alpine-ruby

RUN apk add git
RUN apk add install ruby ruby-dev
RUN gem install dpl -v 1.8.47

ENTRYPOINT ["dpl"]