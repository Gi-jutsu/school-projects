//
//  SummaryCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 24/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class SummaryCell: UITableViewCell {
    @IBOutlet weak var summaryLabel: UILabel!
    
    func setSummary(_ data: String) {
        summaryLabel.text = data
    }
}
