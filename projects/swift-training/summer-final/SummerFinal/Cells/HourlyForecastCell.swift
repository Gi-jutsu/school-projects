//
//  HourlyForecastCell.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 23/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class HourlyForecastCell:UITableViewCell, UICollectionViewDelegate, UICollectionViewDataSource {
    @IBOutlet weak var hourlyCollectionView : UICollectionView!
    var hourlyDetails: DataBlock?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        initializeHourlyCollectionView()
    }

    func initializeHourlyCollectionView() {
        hourlyCollectionView.dataSource = self
        hourlyCollectionView.delegate = self

        let hourlyCollectionViewCell = UINib.init(
            nibName: "HourlyCollectionViewCell",
            bundle: nil
        )
        hourlyCollectionView.register(
            hourlyCollectionViewCell,
            forCellWithReuseIdentifier: "HourlyDetailsCell"
        )
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return hourlyDetails?.data.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        if let hourlyDetails = hourlyDetails {
            let cell = hourlyCollectionView.dequeueReusableCell(withReuseIdentifier: "HourlyDetailsCell", for: indexPath) as! HourlyCollectionViewCell
            cell.setHourlyData(data: hourlyDetails.data[indexPath.row])
            
            return cell
        }
        
        return UICollectionViewCell()
    }
}
