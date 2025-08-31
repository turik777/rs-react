# CO2 Emissions Data Viewer

## Before optimization

### Sort countries by name:

- Commit Duration: 1.7s
- Render Duration: 67.5ms
- Interactions: Click sort button

#### Screenshots:

#### Flamegraph Chart for countries sort
![](img/flamegraph-sort-before.png)

#### Ranked Chart for countries sort
![](img/ranked-sort-before.png)

### Search for a country:

- Commit Duration: 3.2s
- Render Duration: 39.8ms
- Interactions: Type in search input

#### Screenshots:

#### Flamegraph Chart for countries search
![](img/flamegraph-search-before.png)

#### Ranked Chart for countries search
![](img/ranked-search-before.png)

### Select a year:

- Commit Duration: 2s
- Render Duration: 70.8ms
- Interactions: Select a year in year selector

#### Screenshots:

#### Flamegraph Chart for year select
![](img/flamegraph-year-before.png)

#### Ranked Chart for year select
![](img/ranked-year-before.png)


## After optimization

### Sort countries by name:

- Commit Duration: 1.3s
- Render Duration: 10.5ms
- Interactions: Click sort button

#### Screenshots:

#### Flamegraph Chart for countries sort
![](img/flamegraph-sort-after.png)

#### Ranked Chart for countries sort
![](img/ranked-sort-after.png)

### Search for a country:

- Commit Duration: 2.4s
- Render Duration: 5.8ms
- Interactions: Type in search input

#### Screenshots:

#### Flamegraph Chart for countries search
![](img/flamegraph-search-after.png)

#### Ranked Chart for countries search
![](img/ranked-search-after.png)

### Select a year:

- Commit Duration: 2.5s
- Render Duration: 22.3ms
- Interactions: Select a year in year selector

#### Screenshots:

#### Flamegraph Chart for year select
![](img/flamegraph-year-after.png)

#### Ranked Chart for year select
![](img/ranked-year-after.png)
