//
//  DailyForecastCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 23/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class DailyForecastCell:UITableViewCell, UITableViewDelegate, UITableViewDataSource {
    @IBOutlet weak var dailyTableView : UITableView!
    var dailyDetails: DataBlock?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        initializeDailyTableView()
    }
    
    func initializeDailyTableView() {
        dailyTableView.dataSource = self
        dailyTableView.delegate = self
        dailyTableView.separatorStyle = .none
        dailyTableView.allowsSelection = false
        
        let dailyTableViewCell = UINib.init(
            nibName: "DailyTableViewCell",
            bundle: nil
        )
        dailyTableView.register(dailyTableViewCell, forCellReuseIdentifier: "DailyDetailsCell")
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return dailyDetails?.data.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let dailyDetails = dailyDetails {
            let cell = dailyTableView.dequeueReusableCell(
                withIdentifier: "DailyDetailsCell",
                for: indexPath
            ) as! DailyTableViewCell
            cell.setDailyData(data: dailyDetails.data[indexPath.row])
            
            return cell
        }
        
        return UITableViewCell()
    }
}
