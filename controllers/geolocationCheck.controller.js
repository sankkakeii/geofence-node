

const newClient = {

  home: async(req, res) => {
    res.send('hello here')
  },

  // check geo-fence
  geoCheck: async (req, res) =>{
    // register new user
    try{
    const { centerPoint, checkPoint } = req.body

    const loco = {
      name: centerPoint.centerName,
      latitude: centerPoint.centerLatitude,
      longitude: centerPoint.centerLongitude,
      radius: centerPoint.centerRadius
    }


    const GEOFENCE_LOCATION_CHECK = async (user_data, event_location) => {
      const toRadians = val => val * Math.PI / 180
      let distance = 0
    
      // Calculate a point within a circle
      // circle ={center: {latitude: 00.0000, longitude: 00.0000}, radius: number} // in metres
      const pointInsideCircle = (point, circle) => {
        const { center } = circle
        distance = distanceBetween(point, center)
        return distance <= circle.radius // Use '<=' if you want to get all points in the border
      }
    
      const distanceBetween = (point1, point2) => {
        const R = 6371e3 // metres
        const φ1 = toRadians(point1.latitude)
        const φ2 = toRadians(point2.latitude)
        const Δφ = toRadians(point2.latitude - point1.latitude)
        const Δλ = toRadians(point2.longitude - point1.longitude)
    
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
      }
    
      // NOTE: First Param is the point you want to check { latitude: 30.0000, longitude: -95.0000 }
      // NOTE Next param is the center of a school building  with your params out
      // { center: { latitude: 30.0000, longitude: -95.0000 }, radius: 800 }
      const TEMP = []
      
      TEMP.push(pointInsideCircle(user_data, { center: { latitude: event_location.latitude, longitude: event_location.longitude }, radius: event_location.radius }))
    
      const TEST = TEMP.includes(true)
    
      let geoResult = {
        'isInside': TEST,
        'distanceBetween': distance /** R * c */
      }
      res.send(geoResult)
      return geoResult
    }
    GEOFENCE_LOCATION_CHECK({ latitude: checkPoint.checkLatitude, longitude: checkPoint.checkLongitude }, loco)
    
    } catch(err){
      return err
    }
  },
};


module.exports = newClient;

