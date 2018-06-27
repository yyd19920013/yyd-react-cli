Tabs组件用法

state = {
  nav : [
    {
      label : '当前订单',
      icon : 'A-2'
    },
    {
      label : '历史订单',
    }
  ],
  tabIndex : 0,
}
tab(index) {
  console.log(index)
}
<Tabs labels={nav} tabClick={(index)=>this.tab(index)} tabIndex={tabIndex}>
  <TabsItem><div>343434</div></TabsItem>
  <TabsItem><div>0909088</div></TabsItem>
</Tabs>
