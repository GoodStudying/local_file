#番茄阅读  m.*
^http://m.*./reada/getTask url script-request-header https://raw.githubusercontent.com/age174/-/main/fqkk.js
hostname = m.*
#云扫码
^http://.+?[^/]/yunonline/v\d+/redirect/(?!undefined) url script-request-header https://raw.githubusercontent.com/age174/-/main/ysm.js
#微客众智  wx.tiantianaiyuedu.site
^http://wx.tiantianaiyuedu.site/ url script-request-body https://raw.githubusercontent.com/age174/-/main/wkzz.js
hostname = wx.tiantianaiyuedu.site
