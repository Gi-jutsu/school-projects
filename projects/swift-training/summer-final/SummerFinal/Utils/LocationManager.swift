//
//  LocationManager.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 23/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import Foundation
import CoreLocation

class LocationManager: NSObject {
    private let locationManager = CLLocationManager()
    
    public var exposedLocation: CLLocation? {
        return locationManager.location
    }
    
    override init() {
        super.init()
        
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestWhenInUseAuthorization()
    }
}

extension LocationManager: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager,
                         didChangeAuthorization status: CLAuthorizationStatus) {

        switch status {
            case .notDetermined         : print("notDetermined")
            case .authorizedWhenInUse   : print("authorizedWhenInUse")
            case .authorizedAlways      : print("authorizedAlways")
            case .restricted            : print("restricted")           // TODO: handle
            case .denied                : print("denied")               // TODO: handle
        }
    }
    
    func getPlace(for location: CLLocation,
                  completion: @escaping (CLPlacemark?) -> Void) {
        
        let geocoder = CLGeocoder()
        geocoder.reverseGeocodeLocation(location) { placemarks, error in
    
            guard error == nil else {
                print("*** Error in \(#function): \(error!.localizedDescription)")
                completion(nil)
                return
            }
    
            guard let placemark = placemarks?[0] else {
                print("*** Error in \(#function): placemark is nil")
                completion(nil)
                return
            }
        completion(placemark)
        }
    }
}
