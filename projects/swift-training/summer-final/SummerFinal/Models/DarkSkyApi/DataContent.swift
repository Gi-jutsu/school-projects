//
//  DataContent.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import Foundation

struct DataContent:Decodable {
    let time: Date
    let summary: String?
    let icon: Icon?
    let temperature, temperatureMax, temperatureMin, windSpeed, humidity, pressure: Double?
    let uvIndex: Int?
}
