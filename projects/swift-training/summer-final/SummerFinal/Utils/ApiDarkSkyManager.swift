//
//  ApiDarkSkyManager.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import Alamofire
import CoreLocation

typealias OnSuccess<T> = (_ response: T) -> Void
typealias OnError = (_ error: Error?) -> Void

class ApiDarkSkyManager {
    static let shared = ApiDarkSkyManager(baseURL: "https://api.darksky.net", secretKey: "b20c6a13e912effc0ba9047ab851e717")

    let baseURL: String
    let secretKey: String
    
    init(baseURL: String, secretKey: String) {
        self.baseURL = baseURL
        self.secretKey = secretKey
    }
    
    private func parseData<T: Decodable>(_ response: DataResponse<Data>, _ type: T.Type, _ onError: @escaping OnError) -> T? {
        
        if let error = response.error {
            onError(error)
        } else {
            do {
                if let data = response.data, response.error == nil {
                    let decoder = JSONDecoder()
                    decoder.dateDecodingStrategy = .secondsSince1970
                    
                    return try decoder.decode(type, from: data)
                }
            } catch {
                onError(error)
            }
        }
        return nil
    }
    
    func getWeatherForecast(city: City, onSuccess: @escaping OnSuccess<Forecast>, onError: @escaping OnError) {
        let endpoint = "\(self.baseURL)/forecast/\(self.secretKey)/\(city.coordinates.latitude),\(city.coordinates.longitude)?units=si"
        
        Alamofire.request(endpoint).responseData { response in
            if let cityInformations = self.parseData(response, Forecast.self, onError) {
                return onSuccess(cityInformations)
            }
        }
    }
}
