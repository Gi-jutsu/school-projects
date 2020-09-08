//
//  DailyCollectionViewCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 23/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class DailyTableViewCell : UITableViewCell {
    @IBOutlet weak var weatherImage: UIImageView!
    @IBOutlet weak var dayLabel: UILabel!
    @IBOutlet weak var temperatureMinLabel: UILabel!
    @IBOutlet weak var temperatureMaxLabel: UILabel!
    
    func setDailyData(data: DataContent) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "EEEE"
        let day = dateFormatter.string(from: data.time)
        
        dayLabel.text = day
        temperatureMaxLabel.text = String(Int(data.temperatureMax ?? 0))
        temperatureMinLabel.text = String(Int(data.temperatureMin ?? 0))
        
        if let image = UIImage(named: data.icon?.rawValue ?? "unknown-weather-icon") {
            self.weatherImage.image = image
        }
    }
}
