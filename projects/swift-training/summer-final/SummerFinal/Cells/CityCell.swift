//
//  CityCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class CityCell: UITableViewCell {
    @IBOutlet weak var nameLabel: UILabel!
    
    func setData(_ data: City) {
        nameLabel.text = data.name
    }
}
