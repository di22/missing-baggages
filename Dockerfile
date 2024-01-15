# 1
FROM node:20-alpine AS build
WORKDIR /app
RUN npm cache clean --force

COPY . .
RUN npm i
RUN npm run build --prod

# 2
FROM nginx:alpine
ARG PORT
ENV PORT=80
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/missing-baggages/browser /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]