#FROM frolvlad/alpine-ruby
#
#RUN gem update --system
#RUN apk add git
#RUN apk add build-essential
#RUN apk add ruby ruby-dev
##RUN gem install rubygem-json
#RUN gem install json
#RUN gem install dpl -v 1.8.47

FROM ruby:2.6-alpine
MAINTAINER Tobias L. Maier <tobias.maier@baucloud.com>

RUN echo 'gem: --no-document' >> /etc/gemrc

RUN apk add --no-cache \
  curl \
  git

RUN gem install dpl

WORKDIR /tmp

#COPY entrypoint.sh /
#ENTRYPOINT ["/entrypoint.sh"]
#CMD ["--help"]

ENTRYPOINT ["dpl"]