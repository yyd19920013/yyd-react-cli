TradingList组件用法

<TradingList
 url="/crm/promote/listBrancherSummaryData"
 data={[
 {
   label : '时间',
   field : 'time'
 },
 {
   label : '收/支',
   field : 'sell'
 },
 {
   label : '说明',
   field : 'explain'
 }
]} />


HButton Attributes

参数           说明                  类型               可选值                           默认值

url           列表接口               string             -                                -

params        接口参数               {}                 -                                -  

data          列表字段               []                 -                                -
