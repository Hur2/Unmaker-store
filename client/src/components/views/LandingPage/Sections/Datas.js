const continents = [
    { "_id": 1, "name": "가구/인테리어" },
    { "_id": 2, "name": "도서" },
    { "_id": 3, "name": "디지털/가전" },
    { "_id": 4, "name": "생활/건강" },
    { "_id": 5, "name": "스포츠/레저" },
    { "_id": 6, "name": "식품" },
    { "_id": 7, "name": "여가/생활편의" },
    { "_id": 8, "name": "출산/육아" },
    { "_id": 9, "name": "패션의류" },
    { "_id": 10, "name": "패션잡화" },
    { "_id": 11, "name": "화장품/미용" }
]

const price = [
    { "_id": 1, "name": "any", "array": [] },
    { "_id": 2, "name": "0 ~ 4,999원", "array": [0, 4999] },
    { "_id": 3, "name": "5,000원 ~ 9,999원", "array": [5000, 9999] },
    { "_id": 4, "name": "10,000원 ~ 49,999원", "array": [10000, 49999] },
    { "_id": 5, "name": "50,000원 ~ 99,999원", "array": [50000, 99999] },
    { "_id": 6, "name": "100,000원 ~", "array": [100000, 10000000] }
]
export {
    continents,
    price
}

