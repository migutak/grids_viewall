FROM oraclelinux:7-slim AS appbuild

# Create app directory
WORKDIR /app

COPY . .

RUN yum update -y && \
  yum install -y oracle-release-el7 && \
  yum install -y oracle-nodejs-release-el7 && \
  yum install -y --disablerepo=ol7_developer_EPEL nodejs && \
  yum install -y oracle-instantclient19.3-basic.x86_64 && \
  yum clean all && \
  node --version && \
  npm --version

EXPOSE 4000
CMD ["npm", "start"]


# docker build -t migutak/grids_viewall:1.0.0 . 