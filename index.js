// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Customer {
  constructor(name, neighborhoodid){
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodid;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    });
  }

  meals(){
    let myMeals = [];
    let deliveries = this.deliveries();
    for (let delivery of deliveries){
      myMeals.push(store.meals.find(function(meal){
        return meal.id === delivery.mealId;
      }));
    }
    return myMeals;
  }

  totalSpent(){
    let myMeals = [...this.meals()];
    const getTotalPrice = function(agg, el, i , myMeals){
      return agg + el.price;
    }
    return myMeals.reduce(getTotalPrice, 0)
  }
}

class Delivery {
  constructor(mealid, neighborhoodid, customerid){
    this.mealId = mealid;
    this.neighborhoodId = neighborhoodid;
    this.customerId = customerid;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find((meal) => {
      return meal.id === this.mealId;
    });
  }

  customer(){
    return store.customers.find((customer) => {
      return customer.id === this.customerId;
    });
  }

  neighborhood(){
    return store.neighborhoods.find((neighborhood) => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id;
    });
  }

  customers(){
    let myCustomers = [];
    let deliveries = this.deliveries();
    for (let delivery of deliveries){
      myCustomers.push(store.customers.find(function(customer){
        return customer.id === delivery.customerId;
      }));
    }
    return myCustomers;
  }

  static byPrice(){
    let sortable = [...store.meals];
    sortable.sort(function(a, b) {
      return b.price - a.price;
    });
    return sortable;
  }
}

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers(){
    return store.customers.filter((customer) => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals(){
    let myMeals = [];
    let deliveries = this.deliveries();
    for (let delivery of deliveries){
      let myMeal = (store.meals.find(function(meal){
        return meal.id === delivery.mealId;
      }));
      if (!(myMeals.includes(myMeal))){
        myMeals.push(myMeal);
      }
    }
    return myMeals;
  }
}
