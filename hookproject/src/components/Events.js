import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import {format} from 'date-fns'
import {sum } from 'mathjs'
import {Link} from 'react-router-dom'
import {AiOutlineFilePdf } from 'react-icons/ai'
import data from '../data/response.json'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "./events.css"

const dataArray = new Array(...new Set(data.lstVendorAnalytics.map(each => JSON.stringify({
  CustomerName: each.CustomerName,
  VendorName: each.VendorName,
  ShipToName: each.ShipToName,
  Addr1: each.Addr1,
  StateCode: each.StateCode,
  CityName: each.CityName,
  LocationType: each.LocationType,
}))))


function MyFunc(vendorsOrders, each) {
  const orders = vendorsOrders.filter(every => {
    if (every.VendorName === each.VendorName && every.CustomerName === each.CustomerName &&
      each.ShipToName === every.ShipToName && each.CityName === every.CityName && each.LocationType === every.LocationType
      && each.Addr1 === every.Addr1 && each.StateCode === every.StateCode) {
      return every;
    }
    return null
  })
  return orders
}


let vendorOrderData=[]
let onlyVendorData=[]

const sortFilterData = dataArray.map(each => {
  const items = MyFunc(data.lstVendorAnalytics, JSON.parse(each))
  const countofOrders = items.map(each => each.OrderNumber)
  const subtotalCommon = []
  const productsPriceCommon = []
  const totalproductunitprice = []
  const totalFee = []

  const CommonOrders = countofOrders.reduce(function (acc, item) {
    // console.log(acc,item)
    if (item === acc) {
      const totalItem = items.filter(each => each.OrderNumber === item)

      //  console.log((totalItem.map(each=>each.Gallons)))

      if (totalItem.length === 2) {
        const sumofSame = sum(totalItem.map(each => each.Gallons))
        const sumofproductPrice = sum(totalItem.map(each => each.ProductPrice))
        const sumofproductUnitPrice = sum(totalItem.map(each => each.ProductUnitPrice))
        const sumofFee = sum(totalItem.map(each => each.Fees))

        if (!subtotalCommon.includes(sumofSame)) {
          subtotalCommon.push(sumofSame)
          productsPriceCommon.push(sumofproductPrice)
          totalproductunitprice.push(sumofproductUnitPrice)
          totalFee.push(sumofFee)
        } else {
          subtotalCommon.push(0)
          productsPriceCommon.push(0)
          totalproductunitprice.push(0)
          totalFee.push(0)
        }
      } else if (totalItem.length > 2) {
        const sumofSame = sum(totalItem.map(each => each.Gallons))
        const sumofproductPrice = sum(totalItem.map(each => each.ProductPrice))
        const sumofproductUnitPrice = sum(totalItem.map(each => each.ProductUnitPrice))
        const sumofFee = sum(totalItem.map(each => each.Fees))
        // console.log(totalItem.map(each=>each.Gallons))

        if (!subtotalCommon.includes(sumofSame)) {
          subtotalCommon.push(sumofSame)
          productsPriceCommon.push(sumofproductPrice)
          totalproductunitprice.push(sumofproductUnitPrice)
          totalFee.push(sumofFee)
        } else {

          subtotalCommon.splice(subtotalCommon.length - 1, 1, 0, sumofSame)
          productsPriceCommon.splice(productsPriceCommon.length - 1, 1, 0, sumofproductPrice)
          totalproductunitprice.splice(totalproductunitprice.length - 1, 1, 0, sumofproductUnitPrice)
          totalFee.splice(totalFee.length - 1, 1, 0, sumofFee)
        }
      }

      return acc
    } else {
      const totalItem = items.filter(each => each.OrderNumber === item)
      // console.log((totalItem.map(each=>each.Gallons)))
      const productItems = totalItem.map(each => each.Gallons)
      const sumofproductPrice = totalItem.map(each => each.ProductPrice)
      const sumofproductUnitPrice = (totalItem.map(each => each.ProductUnitPrice))
      const sumofFee = (totalItem.map(each => each.Fees))
      if (productItems.length === 1) {
        subtotalCommon.push(parseFloat(productItems.toString()))
        productsPriceCommon.push(parseFloat(sumofproductPrice.toString()))
        totalproductunitprice.push(parseFloat(sumofproductUnitPrice.toString()))
        totalFee.push(parseFloat(sumofFee.toString()))
      }
      else {
        subtotalCommon.push(0)
        productsPriceCommon.push(0)
        totalproductunitprice.push(0)
        totalFee.push(0)
      }



      return item
    }
  }
    , null)
  //  console.log(subtotalCommon)
  //  console.log(productsPriceCommon)
  //  console.log(totalproductunitprice)
  // console.log(totalFee)
  // console.log(CommonOrders)
  const orderItem = []

  for (let i = 0; i < subtotalCommon.length; i++) {
    for (let j = 0; j < items.length; j++) {
      for (let k = 0; k < productsPriceCommon.length; k++) {
        for (let l = 0; l < totalproductunitprice.length; l++) {
          for (let m = 0; m < totalFee.length; m++) {
            if (i === j && j === k && k === l && l === m) {
              // console.log(i,j,k)
            
              orderItem.push({ ...items[j],respresentative:{vendor : JSON.parse(each) } ,})
            }
          }
        }
      }
    }
  }

// console.log(orderItem)

vendorOrderData.push(...orderItem)
onlyVendorData.push(JSON.parse(each))
  const sortedData = { vendor: JSON.parse(each), orders: orderItem }
  return sortedData
})
// console.log(sortFilterData)

console.log(vendorOrderData)
console.log(onlyVendorData)
function Events() {
  const formattedDate=(rowdata)=>{
    return format(new Date(rowdata.DeliveryDate),"MM/dd/yyyy")
  }
  const styleFile=(rowdata)=>{
    return <Link as="a" href={rowdata.FileName} target="_blank" ><AiOutlineFilePdf /></Link>
  }

  console.log(Object.keys(vendorOrderData[0].respresentative.vendor))
  // const groupBodyData=(rowdata)=>{
  //   return rowdata.respresentative.vendor
  // }
  return (
    <div 
     className="card ">
     
      <DataTable value={vendorOrderData} scrollable scrollHeight="950px" showGridlines    
       rowGroupMode="rowspan" groupRowsBy={Object.keys(vendorOrderData[0].respresentative.vendor)}
                    sortMode="single" sortField={Object.keys(vendorOrderData[0].respresentative.vendor)} sortOrder={1}   className="shadow-8 datatablez">
        
        {/* <Column  field="Slno" header="SLNo" body={countNum}></Column>

         */}
            <Column 
          header="#"
          headerStyle={{ width: "3rem" }}
          className="text-center"
          body={(data, options) => options.rowIndex + 1}
        ></Column>
 
         {Object.keys(vendorOrderData[0].respresentative.vendor).map(each=>(        
          <Column  field={each} header={each}></Column>       
         ))}  
  
        <Column field="OrderNumber" header="OrderNumber" className="text-center" ></Column>
        <Column  field="CustomerID" header="CustomerID " className="text-center"></Column>
        <Column  field="ProdDesc" header="ProdDesc" className="text-center"></Column>
        <Column field="DeliveryDate" header="DeliveryDate" body={formattedDate} className="text-center"></Column>
        <Column  field="ProductID" header="ProductID" className="text-center"></Column>
        <Column  field="ProductPrice" header="ProductPrice" className="text-center" ></Column>
        <Column  field="ProductUnitPrice" header="ProductUnitPrice" className="text-center"></Column>
        <Column  field="Gallons" header="Gallons" className="text-center"></Column>
        <Column  field="TaxPrice" header="TaxPrice" className="text-center"></Column>
        <Column  field="Fees" header="Fees" className="text-center" ></Column>
        <Column  field="FileName" header="FileName" body={styleFile} className="text-center" ></Column>
        <Column  field="AverageGross" header="AverageGross" className="text-center"></Column>
        <Column  field="TaxUnitPrice" header="TaxUnitPrice" className="text-center"></Column>
        <Column  field="EnvironmentalFee" header="EnvironmentalFee" className="text-center" ></Column>
        <Column field="OtherFee" header="OtherFee" className="text-center"></Column>
         <Column field="DeliveryFee" header="DeliveryFee" className="text-center"></Column>
        <Column field="TerminalGroupID" header="TerminalGroupID" className="text-center"></Column>
        <Column  field="LoadingTime" header="LoadingTime" className="text-center" ></Column>
        <Column  field="SiteSetupTime" header="SiteSetupTime" className="text-center" ></Column>       
      
      </DataTable>

    </div>

  )
}

export default Events