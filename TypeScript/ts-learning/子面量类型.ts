{
  const str = "this is string"; // str: 'this is string'
  const num = 1; // num: 1
  const bool = true; // bool: true
}

{
  let str = "this is string"; // str: string
  let num = 1; // num: number
  let bool = true; // bool: boolean
}

{
  const specifiedStr: "this is string" = "this is string"; // 类型是 '"this is string"'
  let str2 = specifiedStr; // 即便使用 let 定义，类型是 'this is string'
}

// any 和 undefined 的类型拓宽
{
  let x = null;
  let y = undefined;

  const z = null;

  let anyFun = (param = null) => param;

  let a = z;
  let b = x;
  let c = y;
}

// 类型守卫的 类型缩小
{
  let func = (anything: any) => {
    if (typeof anything === "string") {
      return anything; // 类型是 string
    } else if (typeof anything === "number") {
      return anything; // 类型是 number
    }

    return null;
  };
}
// 类型守卫将联合类型缩小到明确的子类型
{
  let func = (anything: string | number) => {
    if (typeof anything === "string") {
      return anything; // 类型是 string
    } else {
      return anything; // 类型是 number
    }
  };
}

{
  type Goods = "pen" | "pencil" | "ruler";

  const getPenCost = (item: "pen") => 2;

  const getPencilCost = (item: "pencil") => 4;

  const getRulerCost = (item: "ruler") => 6;

  const getCost = (item: Goods) => {
    if (item === "pen") {
      return getPenCost(item); // item => 'pen'
    } else if (item === "pencil") {
      return getPencilCost(item); // item => 'pencil'
    } else {
      return getRulerCost(item); // item => 'ruler'
    }
  };
}
