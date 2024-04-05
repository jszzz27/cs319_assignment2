import React, { useEffect, useState } from "react";
import items from "./product.json";
const GameShop = () => {
  const [cart, setCart] = useState([]);
  const [listItems, setListItems] = useState();
  const [filter, setFilter] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [currState, setCurrState] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [Address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    makeList();
  }, [filter]);
  useEffect(() => {
    makeList();
    total();
  }, [cart]);
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    totalVal = totalVal * 1.07;
    totalVal = totalVal.toFixed(2);
    setCartTotal(totalVal);
  };
  const orderTime = () => {
    setCurrState(2);
  };
  const browseTime = () => {
    setCart([]);
    setCurrState(0);
  };
  function howMany(id) {
    let hm = cart.filter((cartItem) => cartItem.id === id);
    return hm.length;
  }
  const checkoutTime = () => {
    setFilter("");
    setCurrState(1);
  };
  const returnTime = () => {
    setCurrState(0);
  };
  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
  };
  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
    setCartCount(cartCount - 1);
  };
  const makeCartList = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (howMany(items[i]["id"]) != 0) {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setCartItems(
      copyList.map((product) => (
        <div key={product.id}>
          <img src={product.image} />
          <div>{product.title}</div>
          <div>${product.price}</div>
          <div>Quantity ordered: {howMany(product.id)}</div>
        </div>
      ))
    );
  };
  const makeOrderlist = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (howMany(items[i]["id"]) != 0) {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setOrderItems(
      copyList.map((product) => (
        <div key={product.id}>
          <img src={product.image} />
          <div>{product.title}</div>
          <div>${product.price}</div>
          <div>Quantity ordered: {howMany(product.id)}</div>
        </div>
      ))
    );
  };
  const makeList = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (
          items[i]["title"].toLowerCase().includes(filter.toLowerCase()) ||
          filter === ""
        ) {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setListItems(
      copyList.map((product) => (
        <div key={product.id}>
          <div>
            <div>
              <img src={product.image} />
            </div>
            <div>
              <div>
                <strong>{product.title}</strong>
              </div>
              <div>Category: {product.category}</div>
              <div>{product.description}</div>
            </div>
            <div>
              <div>${product.price}</div>
              <button
                type="button"
                variant="light"
                onClick={() => removeFromCart(product)}
              >
                {" "}
                -{" "}
              </button>{" "}
              <button
                type="button"
                variant="light"
                onClick={() => addToCart(product)}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <div>Quantity ordered: {howMany(product.id)}</div>
          </div>
        </div>
      ))
    );
  };
  if (currState === 0) {
    return (
      <div>
        <div>
          <h1>38's GameStop</h1>
          <div class="topnav">
            <button
              type="button"
              onClick={() => {
                checkoutTime();
                makeCartList();
              }}
              id="checkout"
            >
              Checkout
            </button>
            <div class="search-container">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  onChange={(e) => {
                    setFilter(e.target.value);
                    console.log(e.target.value);
                  }}
                ></input>
              </form>
            </div>
          </div>
          <div class="grid-container">{listItems}</div>
        </div>
      </div>
    );
  } else if (currState === 1) {
    return (
      <div>
        <div>
          <h1>38's GameStop</h1>
          <div class="topnav">
            <button type="button" onClick={() => returnTime()} id="checkout">
              Return
            </button>
          </div>
          <h2 id="cart">Current Cart:</h2>
          <div class="grid-container">{cartItems}</div>
          <div class="totalprice">Total: ${cartTotal}</div>
        </div>
        <div>
          <form id="payinfo">
            <h2>Payment Info</h2>
            <label for="fullname">Full Name: </label>
            <input
              required
              type="text"
              id="fullname"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            ></input>
            <br></br>
            <label for="email">Email: </label>
            <input
              required
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <br></br>
            <label for="card">Card: </label>
            <input
              maxLength={16}
              required
              type="text"
              id="card"
              onChange={(e) => {
                setCard(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <br></br>
            <label for="address">Address: </label>
            <input
              required
              type="text"
              id="address"
              onChange={(e) => {
                setAddress(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <br></br>
            <label for="city">City: </label>
            <input
              required
              type="text"
              id="city"
              onChange={(e) => {
                setCity(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <br></br>
            <label for="state">State: </label>
            <input
              required
              type="text"
              id="state"
              onChange={(e) => {
                setState(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <br></br>
            <label for="zip">Zip: </label>
            <input
              required
              maxLength={5}
              type="text"
              id="zip"
              onChange={(e) => {
                setZip(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
          </form>
          <button
            type="button"
            onClick={() => {
              makeOrderlist();
              orderTime();
              makeList();
            }}
          >
            Order
          </button>
        </div>
      </div>
    );
  } else if (currState === 2) {
    return (
      <div>
        <div>
          <h1>38's GameStop</h1>
          <div class="topnav">
            <button type="button" onClick={() => browseTime()} id="checkout">
              Back to browse
            </button>
          </div>
          <div class="grid-container">{orderItems}</div>
          <div class="totalprice">Total: ${cartTotal}</div>
          <div>{fullName}</div>
          <div>{email}</div>
          <div>{card}</div>
          <div>{Address}</div>
          <div>{city}</div>
          <div>{state}</div>
          <div>{zip}</div>
        </div>
      </div>
    );
  }
};
export default GameShop;