const LearnSustainability = () => {
    return (
        <div>
            <h2>🌱 Learn Sustainability in Software Engineering</h2>

            {/* FAQ Section */}
            <div className="mt-4">
                <h4>❓ Frequently Asked Questions (FAQ)</h4>
                <div className="accordion mt-3" id="faqAccordion">

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                What is sustainability in software engineering?
                            </button>
                        </h2>
                        <div id="faq1" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                Sustainability in software engineering refers to designing, developing, and maintaining software 
                                in a way that minimizes environmental impact while ensuring long-term usability, efficiency, and maintainability.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                Why is sustainable software important?
                            </button>
                        </h2>
                        <div id="faq2" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                Sustainable software reduces energy consumption, extends hardware lifespan, and ensures software systems 
                                remain adaptable and efficient over time, leading to lower costs and reduced environmental impact.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                How can developers contribute to sustainability?
                            </button>
                        </h2>
                        <div id="faq3" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                Developers can optimize code for performance, use energy-efficient cloud solutions, minimize server load, 
                                and follow best practices like caching and reducing unnecessary computations.
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sustainability Facts Section */}
            <div className="mt-5">
                <h4>📢 Sustainability Facts in Software Engineering</h4>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <div className="card bg-light p-3">
                            <h5>⚡ Energy Efficiency Matters</h5>
                            <p>Optimizing code execution and reducing redundant computations can lower CPU usage and reduce energy consumption.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card bg-light p-3">
                            <h5>🌍 Data Centers & Carbon Emissions</h5>
                            <p>Data centers contribute to around 1% of global electricity consumption. Sustainable software helps reduce this footprint.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card bg-light p-3">
                            <h5>💾 Efficient Storage Saves Resources</h5>
                            <p>Reducing unnecessary data storage and using efficient compression techniques lowers storage costs and energy usage.</p>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3">
                        <div className="card bg-light p-3">
                            <h5>♻️ Green Coding Practices</h5>
                            <p>Refactoring old code, reducing dependencies, and writing efficient algorithms contribute to sustainable development.</p>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3">
                        <div className="card bg-light p-3">
                            <h5>🚀 Cloud Optimization</h5>
                            <p>Using scalable cloud solutions and reducing idle server time can significantly cut down on energy waste.</p>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3">
                        <div className="card bg-light p-3">
                            <h5>🔋 Battery-Friendly Mobile Apps</h5>
                            <p>Reducing background processes and unnecessary API calls can enhance battery life and device longevity.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LearnSustainability;
