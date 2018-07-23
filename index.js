// global datastore

//a MEAL has many CUSTOMERS
//a DELIVERY belongs to a MEAL, belongs to a CUSTOMER, and belongs to a NEIGHBORHOOD
//a CUSTOMER has many DELIVERIES
//a CUSTOMER has many MEALS through DELIVERIES
//a CUSTOMER belongs to a NEIGHBORHOOD
//a NEIGHBORHOOD has many DELIVERIES
//a NEIGHBORHOOD has many CUSTOMERS thru DELIVERIES
//a NEIGHBORHOOD has many MEALS thru DELIVERIES
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers() {
    let y = this.deliveries().map(delivery => {
      return delivery.customer()
    })
    return [...new Set(y)]
  }

  //returns a unique list
  meals() {
    let x = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    return [...new Set(x)]
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().map(meal => meal.price).reduce((a,b) => a + b)
  }

}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort((a,b) => {
      return b.price - a.price
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }

}
