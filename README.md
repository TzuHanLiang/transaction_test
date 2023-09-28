# transaction_test
test  transaction of mongoDB replica set

### MongoDB副本集Docker運行指南

#### 1. **下載和安裝Docker**
前往[Docker官網](https://www.docker.com/products/docker-desktop)下載並安裝適用於Mac的Docker Desktop。

#### 2. **下載MongoDB Docker鏡像**
打開終端，執行以下命令來下載MongoDB的Docker鏡像：
```bash
docker pull mongo
```

#### 3. **創建docker-compose.yml檔案**
使用`vi`或其他的文本編輯器創建一個`docker-compose.yml`文件，並添加相應的配置。

#### 4. **創建Docker網絡**
```bash
docker network create mongodb-net
```

#### 5. **啟動容器**
在`docker-compose.yml`檔案的目錄下，運行：
```bash
docker-compose up -d
```

#### 6. **查看運行的容器**
```bash
docker ps
```

#### 7. **連線至Mongo Shell**
- 使用Mongo Shell連接：
    ```bash
    mongosh --host 127.0.0.1 --port 27017
    ```
- 或進入容器：
    ```bash
    docker exec -it <container-id> bin/bash
    ```
    然後啟動Mongo Shell：
    ```bash
    mongosh
    ```
#### 8. **查看所有可用的數據庫**
```bash
show dbs 
```

#### 9. **創建一個新的數據庫**
我使用 use test 新創建一個名為 test 的資料庫
```bash
use <database_name>
```

#### 10. **初始化副本集**
##### 方法一：
1. 使用以下命令初始化副本集：

```bash
rs.initiate()
```

2. **獲取當前副本集配置**

```bash
cfg = rs.conf()
```

3. **修改副本集配置**

```bash
cfg._id = "rs0"
cfg.members = [{ _id: 0, host: "127.0.0.1:27017" }]
```

4. **重新配置副本集**

```bash
rs.reconfig(cfg, {force: true})
```
##### 方法二：
使用以下命令初始化副本集：

```bash
rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "127.0.0.1:27017" }] })
```

#### 11. **獲取容器的IP地址**

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-id>
```

### 查看錯誤日誌
- 若運行中出現問題，您可以查看Docker容器的日誌來獲取更多信息：

```bash
docker logs <container-id>
```

### 完成
現在，就已經成功設置並運行了一個MongoDB副本集在您的Docker環境中。

請注意替換上述命令中的`<container-id>`為實際容器ID。可以通過`docker ps`命令找到容器ID。

### 使用 table plus 進行連線測試

```
mongodb://127.0.0.1:27017/test?replicaSet=rs0
```
