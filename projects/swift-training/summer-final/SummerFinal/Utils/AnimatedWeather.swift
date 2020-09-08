//
//  AnimatedWeather.swift
//  SummerFinal
//
//  Created by Dylan DE SOUSA on 24/05/2019.
//  Copyright © 2019 Dylan DE SOUSA. All rights reserved.
//

import UIKit

class AnimatedWeather {
    static func setBackgroundWeather(imageView: inout UIImageView, weatherIcon:Icon) {
        let imageName = "background-image-\(weatherIcon.rawValue)"
        
        if let image = UIImage(named: imageName) {
            imageView.image = image
        } else {
            print(imageName)
            imageView.image = UIImage(named: "background-image-clear-day")
        }
    }
}
