docker rm nginx -f
docker run --name nginx -p 8080:80 -d -v %cd%\conf:/etc/nginx/conf.d nginx:latest
docker exec -it nginx bash