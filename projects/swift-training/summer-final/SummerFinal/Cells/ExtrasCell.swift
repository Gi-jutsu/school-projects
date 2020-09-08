//
//  ExtrasCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class ExtrasCell : UITableViewCell {
    @IBOutlet weak var humidityLabel: UILabel!
    @IBOutlet weak var windSpeedLabel: UILabel!
    @IBOutlet weak var pressureLabel: UILabel!
    @IBOutlet weak var uvIndexLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    func setForecast(_ forecast: Forecast) {
        let windSpeed = Int((forecast.currently.windSpeed ?? 0)*3.6)
        let humidity = Int((forecast.currently.humidity ?? 0) * 100)
        
        humidityLabel.text = "\(String(humidity))%"
        windSpeedLabel.text = "\(String(windSpeed))Km/H"
        pressureLabel.text = "\(String(Int(forecast.currently.pressure ?? 0)))hPa"
        uvIndexLabel.text = "\(String(forecast.currently.uvIndex ?? 0))"
    }
}

