'use strict'
const Controller = require('egg').Controller
const fs = require('fs')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    // ctx.body = 'hi, egg';
    await ctx.render('upload.ejs', { data: 'yes，你就是条咸鱼' })
  }

  async upload() {
    const { ctx } = this
    const { body } = ctx.request
    const imgData = body.imgData

    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')
    var dataBuffer = new Buffer(base64Data, 'base64') // 解码图片
    // var dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
    const imageName = `${(Math.random()+'').substr(2)}.png`
    const res = fs.writeFile(imageName, dataBuffer, function (err) {
      if (err) {
        ctx.body = 'err'
      } else {
        ctx.body = 'success'
      }
    })
  }
}

module.exports = HomeController
