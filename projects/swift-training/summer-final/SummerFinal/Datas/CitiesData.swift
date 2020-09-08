//
//  CitiesData.swift
//  Efreitech - Final
//
//  Created by Pierre-Yves Touzain on 10/05/2018.
//  Copyright © 2018 TYP Studio. All rights reserved.
//

import Foundation
import CoreLocation

struct CitiesData {
    static let list = [
        City(name: "San Francisco", coordinates: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194)),
        City(name: "London", coordinates: CLLocationCoordinate2D(latitude: 51.5074, longitude: 0.1278)),
        City(name: "Paris", coordinates: CLLocationCoordinate2D(latitude: 48.8566, longitude: 2.3522)),
        City(name: "Caracas", coordinates: CLLocationCoordinate2D(latitude: 10.4806, longitude: -66.9036)),
        City(name: "Cairo", coordinates: CLLocationCoordinate2D(latitude: 30.0444, longitude: 31.2357)),
        City(name: "New York", coordinates: CLLocationCoordinate2D(latitude: 40.7128, longitude: -74.0060)),
        City(name: "Sydney", coordinates: CLLocationCoordinate2D(latitude: -33.8688, longitude: 151.2093)),
        City(name: "Tokyo", coordinates: CLLocationCoordinate2D(latitude: 35.6895, longitude: 139.6917)),
        City(name: "Beijing", coordinates: CLLocationCoordinate2D(latitude: 39.9042, longitude: 116.4074)),
        City(name: "Bangkok", coordinates: CLLocationCoordinate2D(latitude: 13.7563, longitude: 100.5018)),
        City(name: "Johannesburg", coordinates: CLLocationCoordinate2D(latitude: -26.2041, longitude: 28.0473)),
        City(name: "Kinshasa", coordinates: CLLocationCoordinate2D(latitude: -4.4419, longitude: 15.2663)),
        City(name: "Buenos Aires", coordinates: CLLocationCoordinate2D(latitude: -34.6037, longitude: -58.3816)),
        City(name: "Rio de Janeiro", coordinates: CLLocationCoordinate2D(latitude: -22.9068, longitude: -43.1729)),
        City(name: "Moscow", coordinates: CLLocationCoordinate2D(latitude: 55.7558, longitude: 37.6173)),
        City(name: "Anchorage", coordinates: CLLocationCoordinate2D(latitude: 61.2181, longitude: -149.9003)),
        City(name: "Honolulu", coordinates: CLLocationCoordinate2D(latitude: 21.3069, longitude: -157.8583)),
        City(name: "Noumea", coordinates: CLLocationCoordinate2D(latitude: -22.2711, longitude: 166.4416))
    ]
}
