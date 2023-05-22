import React, { useState } from 'react'
import { format } from "date-fns"
import { Link } from 'react-router-dom'
import data from '../data/response.json'
import { sum } from "mathjs"
import { AiOutlineDown, AiOutlineLeft, AiOutlineFilePdf } from 'react-icons/ai'
import './awards.css'
import 'bootstrap/dist/css/bootstrap.css';

const dataArray = new Array(...new Set(data.lstVendorAnalytics.map(each => JSON.stringify({
  CustomerName: each.CustomerName,
  VendorName: each.VendorName,
  ShipToName: each.ShipToName,
  Address1: each.Addr1,
  StateCode: each.StateCode,
  CityName: each.CityName,
  LocationType: each.LocationType,
}))))


function MyFunc(vendorsOrders, each) {
  const orders = vendorsOrders.filter(every => {
    if (every.VendorName === each.VendorName && every.CustomerName === each.CustomerName &&
      each.ShipToName === every.ShipToName && each.CityName === every.CityName && each.LocationType === every.LocationType
      && each.Address1 === every.Addr1 && each.StateCode === every.StateCode) {
      return every;
    }
    return null
  })
  return orders
}

let count = 0

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
              count = count + 1
              orderItem.push({ order: items[i], total: subtotalCommon[j], totalPrice: productsPriceCommon[k], totalUnit: totalproductunitprice[l], FeeTotal: totalFee[m], num: count })
            }
          }
        }
      }
    }
  }


  const sortedData = { vendor: JSON.parse(each), orders: orderItem ,Numbers: new Array(...Array(orderItem.length).keys()).map(each=>each+1)}
  return sortedData
})
// console.log(sortFilterData)


function Awards() {
  const [upperDrop, setUpperDrop] = useState(false)
  const [sideDrop, setSideDrop] = useState(true)
  let count=0

  const length = !sideDrop ? "setting" : null;
  return (


    <div style={{ backgroundColor: "white", height: "90vh", width: "85%", flexGrow: "1" }}>
      <div className="upper" onClick={() => setUpperDrop(prevState => !prevState)}>
        <button className="arr" type="button" ><AiOutlineDown /></button>
      </div>
      {upperDrop && <div className="show-up-content">

      </div>}


      <div className="grid-data-cont" >
        <div className="side" style={{ display: sideDrop ? "flex" : "none" }}>
          <button className="arr" type="button" onClick={() => setSideDrop(prevState => !prevState)} >
            <AiOutlineLeft /></button>
        </div>
        <div className={`grid ${length}`} onClick={() => setSideDrop(true)}>
          <table>
            <thead>
              
                
            
              <tr className="a bg-dark">
                {/* <th >SLNo.</th> */}
                <th>SlNo</th>
                <th >Customer Name</th>
                <th >VendorName</th>
                <th >ShipToName</th>
                <th >Address1</th>
                <th >StateCode</th>
                <th >City Name</th>
                <th >LocationType</th>
                
                <th >OrderNo</th>
              
                <th >ProductID</th>
                <th >ProdDesc</th>
                <th >Delivery Date</th>
                <th >CustomerId</th>
                <th >FileName</th>
                <th>EnvironmentalFee</th>
                <th >Gallons</th>
                <th >ProductPrice</th>
                <th >ProductUnitPrice</th>
                <th >SiteSetupTime</th>
                <th >TaxPrice</th>
                <th >TaxUnitPrice</th>
                <th >TerminalGroupID</th>
                <th >ZipCode</th>
                <th >Fees</th>
                <th >Delivery Fee</th>
              </tr>
            </thead>

            <tbody >
            

              {sortFilterData.map(every => {

                const rows = every.orders.map(each => each.total)
                let rowspace = 0
                if (rows.includes(0) && every.orders.length === 1) {
                  rowspace = (every.orders.length * 2 + 1)


                } else if (rows.includes(0)) {
                  let zeros = 0
                  for (let each of rows) {
                    if (each === 0) {
                      zeros = zeros + 1
                    }
                  }
                  rowspace = (every.orders.length * 2 + 1) - zeros
                }
                else {
                  rowspace = (every.orders.length * 2 + 1)
                } 
              
              const slLength=every.Numbers.length
              let slRow;
              if(slLength===0){
                slRow=slLength+1*2+1
              }else{
                slRow=slLength*2+1
              }





                return (
                  <>
                  
           
                    <tr>
                      {/* {
                    every.orders.map(each=>(
                      <td>{each.num}</td>
                    ))
                   } */}
                   <td rowSpan={rowspace} className='num'>
                    {every.orders.map(each=>{
                      count=count+1
                      const change= every.orders.indexOf(each)===every.orders.length-1 ? "setB" : null ;
                      return <p className={`count ${change}`}>{count}</p>
                    })}

                   </td>
                                       
                      <td rowSpan={rowspace} >{every.vendor.CustomerName}</td>
                      <td rowSpan={rowspace}>{every.vendor.VendorName}</td>
                      <td rowSpan={rowspace} >{every.vendor.ShipToName}</td>
                      <td rowSpan={rowspace}>{every.vendor.Address1}</td>
                      <td rowSpan={rowspace}>{every.vendor.StateCode}</td>
                      <td rowSpan={rowspace}>{every.vendor.CityName}</td>
                      <td rowSpan={rowspace}>{every.vendor.LocationType}</td>
                    </tr>
                    

                    {every.orders.map(each => {
                      return (
                        <>
                          <tr>
                            
                            <td >{each.order.OrderNumber}</td>
                            <td>{each.order.ProductID}</td>
                            <td>{each.order.ProdDesc}</td>
                            <td>{format(new Date(each.order.DeliveryDate), "MM/dd/yyy")}</td>
                            <td>{each.order.CustomerID}</td>
                            <td className="f" ><Link as="a" href={each.order.FileName} target="_blank" ><AiOutlineFilePdf /></Link></td>
                            <td>{each.order.EnvironmentalFee}</td>
                            <td>{each.order.Gallons}</td>
                            <td>{each.order.ProductPrice}</td>
                            <td>{each.order.ProductUnitPrice}</td>
                            <td>{each.order.SiteSetupTime}</td>
                            <td>{each.order.TaxPrice}</td>
                            <td>{each.order.TaxUnitPrice}</td>
                            <td>{each.order.TerminalGroupID}</td>
                            <td>{each.order.ZipCode}</td>
                            <td>{each.order.Fees}</td>
                            <td>{each.order.DeliveryFee}</td>
                          </tr>
                          {(each.total !== 0 || every.orders.length === 1) &&
                            <tr className="sub">
                              <td ></td>
                              <td style={{ color: "black", fontWeight: "500" }}>Sub Total</td>
                              <td ></td>
                              <td ></td>
                              <td ></td>
                              <td ></td>
                              <td ></td>
                              
                              <td style={{ color: "Red", fontWeight: "500" }} >{each.total}</td>
                              <td style={{ color: "Red", fontWeight: "500" }} >{each.totalPrice}</td>
                              <td style={{ color: "Red", fontWeight: "500" }} >{each.totalUnit}</td>
                              <td ></td>
                              <td ></td>
                              <td ></td>
                              <td ></td>
                              <td ></td>
                              <td style={{ color: "Red", fontWeight: "500" }} >{each.FeeTotal}</td>
                              <td ></td>
                            </tr>}
                        </>
                      )
                    })}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Awards