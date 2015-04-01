FROM ubuntu:14.04
MAINTAINER vicent@tangotree.io

RUN apt-get update && apt-get install -y supervisor python-dev curl \
        git software-properties-common python-software-properties

# Pip could not be installed using apt-get. It retrieved an old version that crashed trying to install nose and mock.
# This new version runs smoothly
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install -y nodejs build-essential

# Install Nginx.
RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get update
RUN apt-get install -y nginx
RUN rm -rf /var/lib/apt/lists/*
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

RUN sed -i "s/\/var\/www\/html/\/code\//" /etc/nginx/sites-enabled/default
RUN sed -i "s/try_files \$uri.*/try_files \$uri\$args \$uri\$args\/ \/index.html;/" /etc/nginx/sites-enabled/default

EXPOSE 80

ADD . /tmp
WORKDIR /tmp

RUN npm install .
RUN npm install -g grunt-cli
RUN grunt build

RUN mv /tmp/dist /code

CMD ["/tmp/run.sh"]
