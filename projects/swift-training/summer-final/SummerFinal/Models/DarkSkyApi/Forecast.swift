//
//  Forecast.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

struct Forecast:Decodable {
    let currently: DataContent
    let daily: DataBlock
    let hourly: DataBlock
}
