const LocationMap = () => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Location</h3>
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4542478257044!2d73.76830361148141!3d18.55354866809195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfeca3422e91%3A0x8cb6c6a027e31fca!2sLa%20Maison%20Citro%C3%ABn%20Pune!5e0!3m2!1sen!2sin!4v1723460719358!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default LocationMap;