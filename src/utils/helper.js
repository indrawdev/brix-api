const Counter = require('../models/counter')

const getCount = async () => {
   try {
      const count = await Counter.findOne({
         attributes: ['counter_value', 'counter_prefix'],
         where: {
            counter_id: 1
         }
      }).then(result => {
         return result.counter_value
      })

      return count
   } catch (err) {
      console.log(err)
   }
}

const setCount = async (number) => { 
   await Counter.update({
      created_by: 0
   },{
      where: {
         counter_id: 1
      }
   })
}

exports.getCount = getCount
exports.setCount = setCount