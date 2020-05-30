FROM ruby:2.6-alpine
MAINTAINER Tobias L. Maier <tobias.maier@baucloud.com>

RUN echo 'gem: --no-document' >> /etc/gemrc

RUN apk add --no-cache \
  curl \
  git

#RUN gem install dpl -v '< 2'
RUN gem install dpl -v 1.10.15 --no-document

WORKDIR /tmp

ENTRYPOINT ["dpl"]