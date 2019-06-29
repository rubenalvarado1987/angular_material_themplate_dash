FROM nginx

ADD dist/sales-rf-display /usr/share/nginx/html
ADD nginx.conf /etc/nginx/
ADD default.conf /etc/nginx/conf.d/

# RUN ls -lh /usr/share/nginx/html
# RUN cat /etc/nginx/nginx.conf