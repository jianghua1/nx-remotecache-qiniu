import { RemoteCacheImplementation, createCustomRunner, initEnv } from 'nx-remotecache-custom'
import qiniu from 'qiniu'

const prefix = 'NXCACHE_'

const accessKey = '4rJWJuLtG6_zb8EmOLwYr0EtQ6g9IZq5m7_4RJTO'
const secretKey = '-I8Wz35cDM0A-2FgFkDRgu1P7KBV-Hlfh7hTSc0Z'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const filename = '18401171567754400428.tar.gz'
const config = new qiniu.conf.Config()
const bucketManager = new qiniu.rs.BucketManager(mac, config)
const privateBucketDomain = 'sk53vfyiw.hd-bkt.clouddn.com'
const deadline = Math.floor(Date.now() / 1000) + 3600 // 1小时过期
const privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, filename, deadline)
console.log(privateDownloadUrl)

// const config = new qiniu.conf.Config()
// const bucketManager = new qiniu.rs.BucketManager(mac, config)

// const handlecallback = (resolve, reject) => {
//   return (respErr, respBody, respInfo) => {
//     if (respErr) {
//       throw respErr
//     }
//     if (respInfo.statusCode === 200) {
//       resolve(respBody)
//     } else {
//       reject(`Error: ${respInfo.statusCode}`)
//     }
//   }
// }

// const getBucketDomain = (mac: qiniu.auth.digest.Mac, bucketName: string) => {
//   const reqURL = `http://api.qiniu.com/v6/domain/list?tbl=${bucketName}`
//   const digest = qiniu.util.generateAccessToken(mac, reqURL)
//   return new Promise((resolve, reject) => {
//     qiniu.rpc.postWithoutForm(reqURL, digest, handlecallback(resolve, reject))
//   })
// }
// getBucketDomain(mac, 'nx-workspace-jh').then((data) => {
//   console.log(data)
// })

// const getEnv = (key: string) => {
//   return process.env[prefix + key.replace(/([A-Z])/g, '_$1').toUpperCase()]
// }

// const getOptions = (options: QiniuBlobRunnerOptions): QiniuBlobRunnerOptions => {
//   const obj = {
//     domain: '',
//     accessKey: '',
//     secretKey: '',
//     bucket: '',
//     zone: '',
//     private: false
//   } as QiniuBlobRunnerOptions
//   Object.keys(options).map((o) => {
//     obj[o] = process.env[prefix + o.replace(/([A-Z])/g, '_$1').toUpperCase()] ?? options[o]
//   })
//   return obj
// }
