// jumat olukoya 6.587129866966669, 3.3848963121180304
// merrybet jumat olukoya 6.586832181005242, 3.3844828515370935

const loco = {
    name: 'TEST',
    latitude: 6.587129866966669,
    longitude: 3.3848963121180304,
    radius: 57
  }
  
  const GEOFENCE_LOCATION_CHECK = async (user_data, event_location) => {
    const toRadians = val => val * Math.PI / 180
  
    // Calculate a point within a circle
    // circle ={center: {latitude: 00.0000, longitude: 00.0000}, radius: number} // in metres
    const pointInsideCircle = (point, circle) => {
      const { center } = circle
      const distance = distanceBetween(point, center)
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
      console.log('distanceBetween: ',R * c)
      return R * c
    }
  
    // NOTE: First Param is the point you want to check { latitude: 30.0000, longitude: -95.0000 }
    // NOTE Next param is the center of a school building  with your params out
    // { center: { latitude: 30.0000, longitude: -95.0000 }, radius: 800 }
    const TEMP = []
    
    TEMP.push(pointInsideCircle(user_data, { center: { latitude: event_location.latitude, longitude: event_location.longitude }, radius: event_location.radius }))
  
    const TEST = TEMP.includes(true)
    console.log('TEST: ',TEST)
    return TEST
  }
  
  // console.log(LOCATION_CHECK({ latitude: 30.062676, longitude: -95.923599 }, loco))
  
  console.log(GEOFENCE_LOCATION_CHECK({ latitude: 6.586832181005242, longitude: 3.3844828515370935 }, loco))
  