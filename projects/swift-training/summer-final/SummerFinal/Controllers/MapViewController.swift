//
//  MapViewController.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 22/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//
import UIKit
import MapKit

class MapViewController: UIViewController, MKMapViewDelegate, UITableViewDelegate, UITableViewDataSource {
    @IBOutlet weak var mapView: MKMapView!
    @IBOutlet weak var backgroundImage: UIImageView!
    @IBOutlet weak var citiesListTableView: UITableView!
    @IBOutlet weak var currentCityNameLabel: UILabel!
    @IBOutlet weak var currentTemperatureNameLabel: UILabel!
    
    private let locationManager = LocationManager()
    private var forecast: Forecast?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        showSpinner(onView: self.view)
        
        initializeTable()
        initializeMap()
        initializeSwitchButton()
    }

    func initializeMap() {
        mapView.delegate = self
    }
    
    func initializeMarkers() {
        mapView.removeAnnotations(mapView.annotations)
        
        for city in CitiesData.list {
            let annotation = MKPointAnnotation()
            
            annotation.coordinate = city.coordinates
            annotation.title = city.name
            
            mapView.addAnnotation(annotation)
        }
    }
    
    func initializeTable() {
        citiesListTableView.dataSource = self
        citiesListTableView.delegate = self
        
        registerTableCells()
    }

    func initializeSwitchButton() {
        let switchButton = UIBarButtonItem(
            image: UIImage(named:"hamburger"),
            style: .plain,
            target: self,
            action: #selector(switchMapList(sender:))
        )
        
        navigationItem.rightBarButtonItem = switchButton
    }
    
    func initializeUserLocation() {
        guard let exposedLocation = self.locationManager.exposedLocation else {
            print("*** Error in \(#function): exposedLocation is nil")
            return
        }
        
        locationManager.getPlace(for: exposedLocation) { placemark in
            guard let placemark = placemark else { return }
    
            if let country = placemark.country, let coordinate = placemark.location?.coordinate {
                let city = City(name: country, coordinates: coordinate)
                self.fetchWeatherDetails(city: city)
            }
            
            self.removeSpinner()
        }
    }
    
    func fetchWeatherDetails(city: City) {
        ApiDarkSkyManager.shared.getWeatherForecast(
            city: city,
            onSuccess: { result in
                self.forecast = result
                
                if let icon = result.currently.icon {
                    AnimatedWeather.setBackgroundWeather(imageView: &self.backgroundImage, weatherIcon: icon)
                }
                
                self.currentCityNameLabel.text = city.name
                self.currentTemperatureNameLabel.text = "\(String(Int(result.currently.temperature ?? 0)))°"
                self.removeSpinner()
            },
            onError: { error in
                self.showAlert(error?.localizedDescription ?? "Error while fetching weather data")
            }
        )
    }
    
    func registerTableCells() {
        let cityCellNib = UINib.init(nibName: "CityCell", bundle: nil)
        citiesListTableView.register(cityCellNib, forCellReuseIdentifier: "CityCell")
    }
    
    func showAlert(_ message: String) {
        let alert = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
        self.present(alert, animated: true, completion: nil)
    }
    
    func showCityDetailsView(city: City) {
        let cityDetailsVC = storyboard?.instantiateViewController(withIdentifier: "CityDetailsView") as! CityDetailsViewController
        cityDetailsVC.city = city
        
        navigationController?.pushViewController(cityDetailsVC, animated: true)
    }
    
    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView) {
        if let selectedAnnotation = view.annotation, let cityName = view.annotation?.title, let coordinate = view.annotation?.coordinate {
            mapView.deselectAnnotation(selectedAnnotation, animated: true)
            
            let selectedCity = City(name: cityName ?? "Unknown city", coordinates: coordinate)
            showCityDetailsView(city: selectedCity)
        }
    }

    func mapViewDidFinishRenderingMap(_ mapView: MKMapView, fullyRendered: Bool) {
        initializeMarkers()
        initializeUserLocation()
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return CitiesData.list.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CityCell", for: indexPath) as! CityCell
        cell.setData(CitiesData.list[indexPath.row])
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        citiesListTableView.deselectRow(at: indexPath, animated: false)
        
        let selectedCity = CitiesData.list[indexPath.row]
        showCityDetailsView(city: selectedCity)
    }
    
    @IBAction func switchMapList(sender: UIBarButtonItem) {
        citiesListTableView.isHidden = !citiesListTableView.isHidden
        mapView.isHidden = !mapView.isHidden
    }
}
