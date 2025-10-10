/* eslint-disable no-multiple-empty-lines */
// application
import { IDepartmentsLink } from '~/interfaces/departments-link';

const dataHeaderDepartments: IDepartmentsLink[] = [
    // {
    //     title: 'Headlights & Lighting',
    //     url: '/product-category/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'xl',
    //         image: '/images/departments/departments-2.jpg',
    //         columns: [
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/product-category/products' },
    //                             { title: 'Hoods', url: '/product-category/products' },
    //                             { title: 'Grilles', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Door Handles', url: '/product-category/products' },
    //                             { title: 'Car Covers', url: '/product-category/products' },
    //                             { title: 'Tailgates', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/product-category/products' },
    //                     { title: 'Steering', url: '/product-category/products' },
    //                     { title: 'Fuel Systems', url: '/product-category/products' },
    //                     { title: 'Transmission', url: '/product-category/products' },
    //                     { title: 'Air Filters', url: '/product-category/products' },
    //                 ],
    //             },
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/product-category/products' },
    //                             { title: 'Tail Lights', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Turn Signals', url: '/product-category/products' },
    //                             { title: 'Switches & Relays', url: '/product-category/products' },
    //                             { title: 'Corner Lights', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Brakes & Suspension',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Brake Discs', url: '/product-category/products' },
    //                             { title: 'Wheel Hubs', url: '/product-category/products' },
    //                             { title: 'Air Suspension', url: '/product-category/products' },
    //                             { title: 'Ball Joints', url: '/product-category/products' },
    //                             { title: 'Brake Pad Sets', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Interior Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Floor Mats', url: '/product-category/products' },
    //                             { title: 'Gauges', url: '/product-category/products' },
    //                             { title: 'Consoles & Organizers', url: '/product-category/products' },
    //                             { title: 'Mobile Electronics', url: '/product-category/products' },
    //                             { title: 'Steering Wheels', url: '/product-category/products' },
    //                             { title: 'Cargo Accessories', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Engine & Drivetrain',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Air Filters', url: '/product-category/products' },
    //                             { title: 'Oxygen Sensors', url: '/product-category/products' },
    //                             { title: 'Heating', url: '/product-category/products' },
    //                             { title: 'Exhaust', url: '/product-category/products' },
    //                             { title: 'Cranks & Pistons', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Tools & Garage',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Repair Manuals', url: '/product-category/products' },
    //                             { title: 'Car Care', url: '/product-category/products' },
    //                             { title: 'Code Readers', url: '/product-category/products' },
    //                             { title: 'Tool Boxes', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    // {
    //     title: 'Interior Parts',
    //     url: '/product-category/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'lg',
    //         image: '/images/departments/departments-1.jpg',
    //         columns: [
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/product-category/products' },
    //                             { title: 'Hoods', url: '/product-category/products' },
    //                             { title: 'Grilles', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Door Handles', url: '/product-category/products' },
    //                             { title: 'Car Covers', url: '/product-category/products' },
    //                             { title: 'Tailgates', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/product-category/products' },
    //                     { title: 'Steering', url: '/product-category/products' },
    //                     { title: 'Fuel Systems', url: '/product-category/products' },
    //                     { title: 'Transmission', url: '/product-category/products' },
    //                     { title: 'Air Filters', url: '/product-category/products' },
    //                 ],
    //             },
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/product-category/products' },
    //                             { title: 'Tail Lights', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Turn Signals', url: '/product-category/products' },
    //                             { title: 'Switches & Relays', url: '/product-category/products' },
    //                             { title: 'Corner Lights', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Brakes & Suspension',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Brake Discs', url: '/product-category/products' },
    //                             { title: 'Wheel Hubs', url: '/product-category/products' },
    //                             { title: 'Air Suspension', url: '/product-category/products' },
    //                             { title: 'Ball Joints', url: '/product-category/products' },
    //                             { title: 'Brake Pad Sets', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Interior Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Floor Mats', url: '/product-category/products' },
    //                             { title: 'Gauges', url: '/product-category/products' },
    //                             { title: 'Consoles & Organizers', url: '/product-category/products' },
    //                             { title: 'Mobile Electronics', url: '/product-category/products' },
    //                             { title: 'Steering Wheels', url: '/product-category/products' },
    //                             { title: 'Cargo Accessories', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Tools & Garage',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Repair Manuals', url: '/product-category/products' },
    //                             { title: 'Car Care', url: '/product-category/products' },
    //                             { title: 'Code Readers', url: '/product-category/products' },
    //                             { title: 'Tool Boxes', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    // {
    //     title: 'Switches & Relays',
    //     url: '/product-category/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'md',
    //         image: '/images/departments/departments-3.jpg',
    //         columns: [
    //             {
    //                 size: 4,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/product-category/products' },
    //                             { title: 'Hoods', url: '/product-category/products' },
    //                             { title: 'Grilles', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Door Handles', url: '/product-category/products' },
    //                             { title: 'Car Covers', url: '/product-category/products' },
    //                             { title: 'Tailgates', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/product-category/products' },
    //                     { title: 'Steering', url: '/product-category/products' },
    //                     { title: 'Fuel Systems', url: '/product-category/products' },
    //                     { title: 'Transmission', url: '/product-category/products' },
    //                     { title: 'Air Filters', url: '/product-category/products' },
    //                 ],
    //             },
    //             {
    //                 size: 4,
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/product-category/products' },
    //                             { title: 'Tail Lights', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Turn Signals', url: '/product-category/products' },
    //                             { title: 'Switches & Relays', url: '/product-category/products' },
    //                             { title: 'Corner Lights', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Brakes & Suspension',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Brake Discs', url: '/product-category/products' },
    //                             { title: 'Wheel Hubs', url: '/product-category/products' },
    //                             { title: 'Air Suspension', url: '/product-category/products' },
    //                             { title: 'Ball Joints', url: '/product-category/products' },
    //                             { title: 'Brake Pad Sets', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: 4,
    //                 links: [
    //                     {
    //                         title: 'Interior Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Floor Mats', url: '/product-category/products' },
    //                             { title: 'Gauges', url: '/product-category/products' },
    //                             { title: 'Consoles & Organizers', url: '/product-category/products' },
    //                             { title: 'Mobile Electronics', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    // {
    //     title: 'Tires & Wheels',
    //     url: '/product-category/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'nl',
    //         image: '/images/departments/departments-4.jpg',
    //         columns: [
    //             {
    //                 size: 6,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/product-category/products' },
    //                             { title: 'Hoods', url: '/product-category/products' },
    //                             { title: 'Grilles', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Door Handles', url: '/product-category/products' },
    //                             { title: 'Car Covers', url: '/product-category/products' },
    //                             { title: 'Tailgates', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/product-category/products' },
    //                     { title: 'Steering', url: '/product-category/products' },
    //                     { title: 'Fuel Systems', url: '/product-category/products' },
    //                     { title: 'Transmission', url: '/product-category/products' },
    //                     { title: 'Air Filters', url: '/product-category/products' },
    //                 ],
    //             },
    //             {
    //                 size: 6,
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/product-category/products' },
    //                             { title: 'Tail Lights', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Turn Signals', url: '/product-category/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    // {
    //     title: 'Tools & Garage',
    //     url: '/product-category/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'sm',
    //         columns: [
    //             {
    //                 size: 12,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/product-category/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/product-category/products' },
    //                             { title: 'Hoods', url: '/product-category/products' },
    //                             { title: 'Grilles', url: '/product-category/products' },
    //                             { title: 'Fog Lights', url: '/product-category/products' },
    //                             { title: 'Door Handles', url: '/product-category/products' },
    //                             { title: 'Car Covers', url: '/product-category/products' },
    //                             { title: 'Tailgates', url: '/product-category/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/product-category/products' },
    //                     { title: 'Steering', url: '/product-category/products' },
    //                     { title: 'Fuel Systems', url: '/product-category/products' },
    //                     { title: 'Transmission', url: '/product-category/products' },
    //                     { title: 'Air Filters', url: '/product-category/products' },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    { title: 'Clutches', url: '/product-category/products' },
    { title: 'Fuel Systems', url: '/product-category/products' },
    { title: 'Steering', url: '/product-category/products' },
    { title: 'Suspension', url: '/product-category/products' },
    { title: 'Body Parts', url: '/product-category/products' },
    { title: 'Transmission', url: '/product-category/products' },
    { title: 'Air Filters', url: '/product-category/products' },
];

export default dataHeaderDepartments;

