//
//  HeaderCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class HeaderCell : UITableViewCell {
    @IBOutlet weak var weatherImage: UIImageView!
    @IBOutlet weak var summaryLabel: UILabel!
    @IBOutlet weak var temperatureLabel: UILabel!
    
    func setHeaderData(data: Forecast) {
        self.summaryLabel.text = data.currently.summary
        self.temperatureLabel.text = "\(String(Int(data.currently.temperature ?? 0)))°"

        if let image = UIImage(named: data.currently.icon?.rawValue ?? "unknown-weather-icon") {
            self.weatherImage.image = image
        }
    }
}
