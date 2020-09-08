//
//  MapViewControllerDetails.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit
import CoreLocation

class CityDetailsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    @IBOutlet weak var weatherDetailsTableView: UITableView!
    @IBOutlet weak var backgroundImage: UIImageView!
    
    let tableSections = ["Header","Hourly","Daily","DailySummary","Extras"]
    var city: City?
    var forecast: Forecast?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = city?.name
        
        showSpinner(onView: self.view)
        
        initializeWeatherDetailsTable()
        fetchWeatherDetails()
    }
    
    func fetchWeatherDetails() {
        if let city = city {
            ApiDarkSkyManager.shared.getWeatherForecast(
                city: city,
                onSuccess: { result in
                    self.forecast = result
                    self.weatherDetailsTableView.reloadData()
                    
                    if let icon = result.currently.icon {
                        AnimatedWeather.setBackgroundWeather(imageView: &self.backgroundImage, weatherIcon: icon)
                    }
                    
                    self.removeSpinner()
                },
                onError: { error in
                    self.showAlert(error?.localizedDescription ?? "Error while fetching weather data")
                }
            )
        }
    }
    
    func initializeWeatherDetailsTable() {
        weatherDetailsTableView.dataSource = self
        weatherDetailsTableView.delegate = self
        weatherDetailsTableView.allowsSelection = false
        
        registerTableCells()
    }
    
    func registerTableCells() {
        let headerCellNib = UINib.init(nibName: "HeaderCell", bundle: nil)
        let hourlyForecastCellNib = UINib.init(nibName: "HourlyForecastCell", bundle: nil)
        let dailyForecastCellNib = UINib.init(nibName: "DailyForecastCell", bundle: nil)
        let summaryCellNib = UINib.init(nibName: "SummaryCell", bundle: nil)
        let extrasCellNib = UINib.init(nibName: "ExtrasCell", bundle: nil)
        
        weatherDetailsTableView.register(headerCellNib, forCellReuseIdentifier: "HeaderCell")
        weatherDetailsTableView.register(hourlyForecastCellNib , forCellReuseIdentifier: "HourlyForecastCell")
        weatherDetailsTableView.register(dailyForecastCellNib , forCellReuseIdentifier: "DailyForecastCell")
        weatherDetailsTableView.register(summaryCellNib, forCellReuseIdentifier: "DailySummaryCell")
        weatherDetailsTableView.register(extrasCellNib , forCellReuseIdentifier: "ExtrasCell")
    }
    
    func showAlert(_ message: String) {
        let alert = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
        self.present(alert, animated: true, completion: nil)
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return self.tableSections.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let forecast = forecast {
            switch(self.tableSections[indexPath.section]) {
                case "Header":
                    let cell = tableView.dequeueReusableCell(withIdentifier: "HeaderCell", for: indexPath) as! HeaderCell
                    cell.setHeaderData(data: forecast)
 
                    return cell
                case "Hourly":
                    let cell = tableView.dequeueReusableCell(withIdentifier: "HourlyForecastCell", for: indexPath) as! HourlyForecastCell
                    cell.hourlyDetails = forecast.hourly
                    
                    return cell
                case "Daily":
                    let cell = tableView.dequeueReusableCell(withIdentifier: "DailyForecastCell", for: indexPath) as! DailyForecastCell
                    cell.dailyDetails = forecast.daily

                    return cell
                case "DailySummary":
                    let cell = tableView.dequeueReusableCell(withIdentifier: "DailySummaryCell", for: indexPath) as! SummaryCell
                    cell.setSummary(forecast.daily.summary ?? "")
                    
                    return cell
                case "Extras":
                    let cell = tableView.dequeueReusableCell(withIdentifier: "ExtrasCell", for: indexPath) as! ExtrasCell
                    cell.setForecast(forecast)

                    return cell
                default:
                    break
            }
        }
        
        return UITableViewCell()
    }
}
