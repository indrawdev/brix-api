exports.me = async (req, res, next) => { 
   res.status(200).json({
      'error': false,
      'messsage': 'Consuming data, please contact it@integra.co.id'
   })
}