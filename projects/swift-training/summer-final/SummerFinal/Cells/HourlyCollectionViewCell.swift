//
//  hourlyCollectionViewCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 23/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class HourlyCollectionViewCell : UICollectionViewCell {
    @IBOutlet weak var weatherImage: UIImageView!
    @IBOutlet weak var hourLabel: UILabel!
    @IBOutlet weak var temperatureLabel: UILabel!
    
    func setHourlyData(data: DataContent) {
        let hour = Calendar.current.component(.hour, from: data.time)
        
        hourLabel.text = String(format: "%02dH", hour)
        temperatureLabel.text = "\(String(Int(data.temperature ?? 0)))°C"
        
        if let image = UIImage(named: data.icon?.rawValue ?? "unknown-weather-icon") {
            self.weatherImage.image = image
        }
    }
}
