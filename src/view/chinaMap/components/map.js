import * as echarts from "echarts";
import axios from "axios";
import { cityNames, setMap } from "./data";


// 通江 511921
let currentCname = '';


export async function DrillDown(cname) {
  if (currentCname == cname) {
    // return;
  } else {
    currentCname = cname;
  }

  let city = cityNames[cname];

  if (city.isRegist) {
    return setMap(city);
  }

  let data;
  try {
    ({ data } = await axios.get(`https://geo.datav.aliyun.com/areas/bound/geojson?code=` + city.code));
  } catch (error) {
    return alert("地理数据请求错误,请使用127.0.0.1访问");
  }

  let { features } = data;
  for (let item of features) {
    let { adcode, name, childrenNum, parent, center } = item.properties;
    if (childrenNum) {
      adcode += "_full";
    }

    if (!cityNames[name]) {
      cityNames[name] = {
        code: adcode,
        name,
        isRegist: false,
        parentName: cname,
        childrenNum,
        center
      }
    }
  }

  // 注入当前展示地区
  echarts.registerMap(cname, data);
  city.isRegist = true;

  return setMap(city);
}

export function DrillUp() {

  if (currentCname == "china") {
    return;
  }

  let city = cityNames[currentCname];
  let fatherCity = cityNames[city.parentName];
  currentCname = fatherCity.name;

  return setMap(fatherCity);
}