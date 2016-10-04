define(['jquery', 'd3', 'mini-tooltip'], function($, d3, tooltip) {
    'use strict';

    describe('Reusable Tooltip Component', () => {
        let tooltipChart,
            containerFixture,
            dataset,
            f;

        beforeEach(() => {
            dataset = [];
            tooltipChart = tooltip();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container')
              .append('svg');
            containerFixture.datum(dataset)
                .call(tooltipChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a tooltip with minimal requirements', () =>  {
            expect(containerFixture.select('.britechart-mini-tooltip').empty()).toBeFalsy();
        });

        it('should not be visible by default', () =>  {
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).toBe('none');
        });

        it('should be visible when required', () =>  {
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).toBe('none');
            tooltipChart.show();
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).not.toBe('none');
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).toBe('block');
        });

        xit('should resize the tooltip depending of number of topics', () =>  {
            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: 0,
                        topicName: 'San Francisco'
                    }
                ]
            }, 10);

            expect(
                containerFixture.select('.tooltip-text-container')
                    .attr('height')
            ).toEqual('81.5');

            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: 0,
                        topicName: 'San Francisco'
                    },
                    {
                        name: 60,
                        value: 10,
                        topicName: 'Chicago'
                    }
                ]
            }, 10);

            expect(
                containerFixture.select('.tooltip-text-container')
                    .attr('height')
            ).toEqual('105');
        });

        describe('Render', function() {

            it('should render the title of the tooltip', () =>  {
                let expected = 'Tooltip title',
                    actual;

                tooltipChart.title(expected);
                tooltipChart.show();

                actual = containerFixture.select('.britechart-mini-tooltip')
                        .selectAll('.mini-tooltip-title')
                        .text();

                expect(actual).toBe(expected);
            });

            it('should render a line of text for the name', () =>  {
                let expected = 'radiating',
                    actual;

                tooltipChart.update({
                    name: expected,
                    value: 10
                });

                actual = containerFixture.select('.britechart-mini-tooltip')
                        .selectAll('.mini-tooltip-name')
                        .text();

                expect(actual).toEqual(expected);
            });

            it('should render a line of text for the value', () =>  {
                let expected = 10,
                    actual;

                tooltipChart.update({
                    name: 'radiating',
                    value: expected
                });

                actual = parseInt(containerFixture.select('.britechart-mini-tooltip')
                        .selectAll('.mini-tooltip-value')
                        .text(), 10);

                expect(actual).toEqual(expected);
            });
        });

        describe('API', function() {

            it('should provide title getter and setter', () => {
                let current = tooltipChart.title(),
                    expected = 'test',
                    actual;

                tooltipChart.title(expected);
                actual = tooltipChart.title();

                expect(current).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });
    });
});