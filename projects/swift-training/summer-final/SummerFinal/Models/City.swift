//
//  City.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import CoreLocation

class City {
    var name: String
    var coordinates: CLLocationCoordinate2D
    
    init(name: String, coordinates: CLLocationCoordinate2D) {
        self.name = name
        self.coordinates = coordinates
    }
}
