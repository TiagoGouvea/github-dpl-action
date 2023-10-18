FROM ruby:3.2-bookworm
LABEL maintainer="Tobias L. Maier <tobias.maier@baucloud.com>"

RUN echo 'gem: --no-document' >>/etc/gemrc

RUN apk add --no-cache \
  curl \
  git

RUN gem install dpl -v 1.10.16 --no-document

WORKDIR /tmp

ENTRYPOINT ["dpl"]
