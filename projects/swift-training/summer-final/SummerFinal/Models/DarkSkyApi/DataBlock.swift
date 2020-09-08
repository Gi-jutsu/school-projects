//
//  Data.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

struct DataBlock:Decodable {
    let summary: String?
    let icon: Icon?
    let data: [DataContent]
}
